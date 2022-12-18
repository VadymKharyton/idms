def main
  # init data
  good_match = 10
  bad_match = 5
  data = {}
  transport_names = {
  'plain' => 'літак',
  'train' => 'потяг',
  'ship' => 'пароплав',
  'hitchhiking' => 'автостоп',
  'car' => 'власне авто',
  'bus' => 'автобус',
  }
  transport = {
  'plain' => 0,
  'train' => 0,
  'ship' => 0,
  'hitchhiking' => 0,
  'car' => 0,
  'bus' => 0,
  }

  # helpers
  def get_user_input(message)
    puts message
    gets.chomp
  end

  def set_value!(hash, key, value_to_add)
    should_set = !hash[key].nil?
    should_set && (hash[key] += value_to_add)
  end

  def get_recommended_names(hash)
    allowed_keys = hash.keys.filter { |key| !hash[key].nil? }
    allowed_keys.sort { |key1, key2| hash[key2] <=> hash[key1] }
  end

  def get_recommended(hash, names)
    keys = get_recommended_names hash
    is_many_exist = keys.length > 1
    is_any_exist = keys.length > 0
    first = keys[0]
    second = keys[1]
    if is_many_exist
      puts '------------------------------------'
      puts "Радимо вам обрати #{names[first]}.\nТакож можете обрати #{names[second]}"
      puts '------------------------------------'
      true
    elsif is_any_exist
      puts '------------------------------------'
      puts "Радимо вам обрати #{names[first]}"
      puts '------------------------------------'
      true
    else
      puts '------------------------------------'
      puts 'Немає жодного варіанту'
      puts '------------------------------------'
      false
    end
  end

  # check distance
  large_distance_recommended = ['plain', 'train', 'ship']
  small_distance_disable = ['plain', 'train']

  data[:distance] = (get_user_input 'Відстань у км: ').to_i
  is_distance_large = data[:distance] >= 500
  is_distance_small = data[:distance] < 100

  transport.each_key do |key|
    if is_distance_small
      small_distance_disable.each do |small_distance|
        transport.delete(small_distance)
        # transport[key] = nil
      end
    elsif is_distance_large
      add_value = large_distance_recommended.include?(key.to_s) ? good_match : bad_match
      set_value!(transport, key, add_value)
    else
      add_value = bad_match
      set_value!(transport, key, add_value)
    end
  end

  # check sea lane
  sea_lane = ['ship']

  sea_lane_text = get_user_input 'Є водний шлях? Дайте відповідь так|ні:'
  has_sea_lane = sea_lane_text.downcase === 'так'
  data[:sea_lane] = has_sea_lane

  unless has_sea_lane
    sea_lane.each do |key|
      transport.delete(key)
      # transport[key] = nil
    end
  end

  # check trip cost
  cost_per_km = {
  'plain' => 5,
  'train' => 5,
  'ship' => 10,
  'hitchhiking' => 1,
  'car' => 10,
  'bus' => 2,
  }

  data[:trip_cost] = (get_user_input 'Вартість поїздки (грн): ').to_i
  cost_per_km_trip = data[:trip_cost] / data[:distance]

  transport.each_key do |key|
    curr_per_km = cost_per_km[key]

    diff = cost_per_km_trip - curr_per_km
    percent_diff = (diff).abs / data[:trip_cost]
    to_add = if diff >= 0
      good_match
    else
      percent_diff <= 10 ? bad_match : 0
    end

    set_value!(transport, key, to_add)
  end

  has_any = get_recommended(transport, transport_names)
  unless has_any
    return
  end

  dangers_text = "Перечисліть всі протипоказання через кому:
1 боязнь висоти
2 морська хвороба
3 захитування

Наприклад: 1, 2"
  dangers_str = get_user_input dangers_text
  dangers_by_transport = {
  1 => ['plain'],
  2 => ['ship'],
  3 => ['bus', 'hitchhiking'],
  }

  dangers = dangers_str.chomp.split(/[, ]*/).map do |key|
    key.to_i
  end

  data[:dangers] = dangers

  dangers.each do |danger_key|
    danger_transports = dangers_by_transport[danger_key] || []
    danger_transports.each do |transport_key|
      transport.delete(transport_key)
      # transport[transport_key] = nil
    end
  end

  has_any = get_recommended(transport, transport_names)
  unless has_any
    return
  end

  # check speed
  speed_rate = {
  'plain' => 10,
  'train' => 7,
  'ship' => 2,
  'hitchhiking' => 1,
  'car' => 5,
  'bus' => 4,
  }
  data[:speed_rate] = (get_user_input 'Вкажіть наскільки вам важлива швидкість поїздки (від 1 до 10): ').to_i

  transport.each_key do |key|
    curr_speed_rate = speed_rate[key]
    is_good_match = curr_speed_rate >= data[:speed_rate]
    is_bad_match = data[:speed_rate] - curr_speed_rate <= 2

    to_add = if is_good_match
      good_match
    else
      is_bad_match ? bad_match : 0
    end

    set_value!(transport, key, to_add)
  end

  # check own car
  # if car field not nil
  unless transport['car'].nil?
    own_car = ['car']

    own_car_text = get_user_input 'Маєте власне авто? Дайте відповідь так|ні:'
    has_own_car = own_car_text.downcase === 'так'
    data[:has_own_car] = has_own_car

    unless has_own_car
      own_car.each do |key|
        transport.delete(key)
        # transport[key] = nil
      end
    end
  end

  get_recommended(transport, transport_names)
end

main