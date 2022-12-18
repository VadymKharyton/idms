import { useState, useEffect, useRef } from "react";
import './QuestionnaireForm.css';

function get_recommended_names(hash) {
  var allowed_keys = Object.keys(hash).filter(function (key) {
      return hash[key] !== 0;
  });

  return allowed_keys.sort(function (key1, key2) {
      return hash[key2] < hash[key1] ? -1 : hash[key2] > hash[key1] ? 1 : 0
  });
};

function get_recommended(hash, names, isFinal, setResult) {
  var keys = get_recommended_names(hash);
  var is_many_exist = keys.length > 1;
  var is_any_exist = keys.length > 0;
  var first = keys[0];
  var second = keys[1];

  if (is_many_exist) {
      console.log("------------------------------------");
      const res = "We advise to choose " + names[first] + ".\nAnd also you can choose " + names[second];
      if (isFinal) {
        setResult(res);
      } else {
        console.log(res);
      }
      console.log("------------------------------------");
      return true;
  } else if (is_any_exist) {
      console.log("------------------------------------");
      const res = "We advise to choose " + names[first];
      if (isFinal) {
        setResult(res);
      } else {
        console.log(res);
      }
      console.log("------------------------------------");
      return true;
  } else {
      console.log("------------------------------------");
      const res = "No variants to choose can be proposed. Sorry :(";
      console.log(res);
      setResult(res);
      console.log("------------------------------------");
      return false;
  }
}


const QuestionnaireForm = ({ className }) => {
  const processAgain = useRef(true);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (!processAgain.current) {
      return
    }
    processAgain.current = false;
    var own_car, own_car_text, has_own_car;

    var good_match = 10;
    var bad_match = 5;
    var data = {};

    var transport_names = {
        plain: "plain",
        train: "train",
        ship: "ship",
        hitchhiking: "hitchiking",
        car: "car",
        bus: "bus"
    };

    var transport = {
        plain: 0,
        train: 0,
        ship: 0,
        hitchhiking: 0,
        car: 0,
        bus: 0
    };

    // check distance
    var large_distance_recommended = ["plain", "train", "ship"];
    var small_distance_disable = ["plain", "train"];

    data.distance = Number(prompt("Distance (km): ", 0));
    var is_distance_large = data.distance >= 500;
    var is_distance_small = data.distance < 100;

    for (const key in transport) {
      if (is_distance_small) {

        Object.values(small_distance_disable).forEach((small_distance) => {
          delete transport[key];
        })
      } else if (is_distance_large) {
          var add_value = large_distance_recommended.includes(key) ? good_match : bad_match;
          transport[key] += add_value;
      } else {
          transport[key] += bad_match;
      }
    }

    // check sea lane
    var sea_lane = ["ship"];
    var sea_lane_text = prompt("Is there any water way (yes|no): ");
    var has_sea_lane = sea_lane_text?.toLowerCase() === "yes";
    data.sea_lane = has_sea_lane;

    if (!has_sea_lane) {
      for (const key of sea_lane) {
        delete transport[key];
      }
    };

    // check trip cost
    var cost_per_km = {
      plain: 5,
      train: 5,
      ship: 10,
      hitchhiking: 1,
      car: 10,
      bus: 2
    };

    data.trip_cost = Number(prompt("Trip price (hryvnia): "));
    var cost_per_km_trip = data.trip_cost / data.distance;

    for(const key in transport) {
      var curr_per_km = cost_per_km[key];
      var diff = cost_per_km_trip - curr_per_km;
      var percent_diff = Math.abs(diff) / data.trip_cost;
      var to_add = diff >= 0 ? good_match : percent_diff <= 10 ? bad_match : 0;
      transport[key] += to_add;
    }

    var has_any = get_recommended(transport, transport_names, false, setMessage);
    if (!has_any) return;
    var dangers_text = "List all contraindications(by comma-separator):\n" + "1: fear of heights\n" + "2: seasickness\n" + "3 swaying\n" + "\n" + "For example: 1, 2";
    var dangers_str = prompt(dangers_text, '1');

    var dangers_by_transport = {
        1: ["plain"],
        2: ["ship"],
        3: ["bus", "hitchhiking"]
    };
    var dangers = dangers_str.split(/[, ]*/).map(function (key) {
      return Number(key);
    });
    
    data.dangers = dangers;
    
    dangers.forEach(function (danger_key) {
        var danger_transports = dangers_by_transport[danger_key] || [];
    
        danger_transports.forEach(function (transport_key) {
            delete transport[transport_key];
        })
    });

    has_any = get_recommended(transport, transport_names, false, setMessage);
    if (!has_any) return;

    // check speed
    var speed_rate = {
        plain: 10,
        train: 7,
        ship: 2,
        hitchhiking: 1,
        car: 5,
        bus: 4
    };

    data.speed_rate = Number(prompt("Speed rate (from 1 to 10): ", '5'));

    for (const key in transport) {
      var curr_speed_rate = speed_rate[key];
      var is_good_match = curr_speed_rate >= data.speed_rate;
      var is_bad_match = data.speed_rate - curr_speed_rate <= 2;
      transport[key] += is_good_match ? good_match : is_bad_match ? bad_match : 0;
    }

    if (transport.car !== 0) {
      own_car = ["car"];
      own_car_text = prompt("Do you have your own car (yes|no): ");
      has_own_car = own_car_text?.toLowerCase() === "yes";
      data.has_own_car = has_own_car;
  
      if (!has_own_car) {
          own_car.forEach(function (key) {
            delete transport[key];
          })
      }
    };

    get_recommended(transport, transport_names, true, setMessage)
    setWasFormSubmitted(true);
  }, []);

  return (
    <div className={className ?? ''}>
      {wasFormSubmitted
        ? (
          <div className="finalMessageBlock">
            <pre className={'finalMessage success'}>{`Our suggestions: ${message}`}</pre>
          </div>
        )
        :<h3>No result yet. Please continue this questionnaire</h3> }
    </div>
  )
};

export default QuestionnaireForm;