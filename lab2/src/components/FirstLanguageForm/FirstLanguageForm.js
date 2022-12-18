import {useState} from "react";
import LanguageResult from "./LanguageResult";
import QuestionBlock from "./QuestionBlock";
import DESCRIPTIONS from './descriptions.json';
import JsImg from './logos/JS.png';
import RnImg from './logos/react-native.png';
import SwiftImg from './logos/Swift-Logo.jpg';
import Java_kotlinImg from './logos/java_kotlin.png';
import PhpImg from './logos/WordPress-PHP.png';
import CppImg from './logos/Cpp.png';
import PythonImg from './logos/python.png';
import JavaImg from './logos/java.jpg';
import RubyImg from './logos/ruby_rails.png';
import './FirstLanguageForm.css';

const getNodeInfo = ({question, leftId, leftAnswer, rightId, rightAnswer}) => ({
  question,
  left: {
    id: leftId,
    answer: leftAnswer,
  },
  right: {
    id: rightId,
    answer: rightAnswer,
  }
});
const getLanguageInfo = ({description, name, logo}) => ({
  description,
  name,
  logo,
  isFinal: true,
});
const getNodeLanguage = (code) => ({
  isFinal: true,
  languageKey: code,
});

const LANGUAGES = {
  JS: 'JS',
  RN: 'REACT_NATIVE',
  SWIFT: 'SWIFT',
  JAVA_KOTLIN: 'JAVA_KOTLIN',
  PHP: 'PHP',
  Cpp: 'C++',
  PYTHON: 'PYTHON',
  JAVA: 'JAVA',
  RUBY: 'RUBY',
};

const QUESTION_ID = {
  YOU_WANT_WORK_ON: 'YOU_WANT_WORK_ON',
  WITHOUT_ADDITIONAL_INSTALLING: 'WITHOUT_ADDITIONAL_INSTALLING',
  MOBILE_NATIVE_APPS: 'MOBILE_NATIVE_APPS',
  IOS_AND_ANDROID: 'IOS_AND_ANDROID',
  WHICH_MOBILE_OS: 'WHICH_MOBILE_OS',
  SITE_WITH_ADMIN_PANEL: 'SITE_WITH_ADMIN_PANEL',
  USE_AI: 'USE_AI',
  KEEP_BITES_ON_CONTROL: 'KEEP_BITES_ON_CONTROL',
  LIKE_USE_TEMPLATE: 'LIKE_USE_TEMPLATE',
}

const LOGOS = {
  [LANGUAGES.JS]: JsImg,
  [LANGUAGES.RN]: RnImg,
  [LANGUAGES.SWIFT]: SwiftImg,
  [LANGUAGES.JAVA_KOTLIN]: Java_kotlinImg,
  [LANGUAGES.PHP]: PhpImg,
  [LANGUAGES.Cpp]: CppImg,
  [LANGUAGES.PYTHON]: PythonImg,
  [LANGUAGES.JAVA]: JavaImg,
  [LANGUAGES.RUBY]: RubyImg,
}

const languages = {
  [LANGUAGES.JS]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.JS],
    name: 'JavaScript (JS)',
    logo: LOGOS[LANGUAGES.JS],
  }),
  [LANGUAGES.RN]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.RN],
    name: 'React Native (JS)',
    logo: LOGOS[LANGUAGES.RN],
  }),
  [LANGUAGES.SWIFT]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.SWIFT],
    name: 'Swift',
    logo: LOGOS[LANGUAGES.SWIFT],
  }),
  [LANGUAGES.JAVA_KOTLIN]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.JAVA_KOTLIN],
    name: 'Java + Kotlin',
    logo: LOGOS[LANGUAGES.JAVA_KOTLIN],
  }),
  [LANGUAGES.PHP]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.PHP],
    name: 'PHP',
    logo: LOGOS[LANGUAGES.PHP],
  }),
  [LANGUAGES.Cpp]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.Cpp],
    name: 'C++',
    logo: LOGOS[LANGUAGES.Cpp],
  }),
  [LANGUAGES.PYTHON]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.PYTHON],
    name: 'Python',
    logo: LOGOS[LANGUAGES.PYTHON],
  }),
  [LANGUAGES.JAVA]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.JAVA],
    name: 'Java',
    logo: LOGOS[LANGUAGES.JAVA],
  }),
  [LANGUAGES.RUBY]: getLanguageInfo({
    description: DESCRIPTIONS[LANGUAGES.RUBY],
    name: 'Ruby + Ruby on Rails',
    logo: LOGOS[LANGUAGES.RUBY],
  }),
}

const nodesInfo = {
  [QUESTION_ID.YOU_WANT_WORK_ON]: getNodeInfo({
    question: 'Choose your first language. Please answer on following questions: \n\n\nWould you rather work with...',
    leftAnswer: 'The visual component of the program',
    leftId: QUESTION_ID.WITHOUT_ADDITIONAL_INSTALLING,
    rightAnswer: 'Setting up the "brains" of the program (development of logic, structure)',
    rightId: QUESTION_ID.KEEP_BITES_ON_CONTROL,
  }),

  [QUESTION_ID.WITHOUT_ADDITIONAL_INSTALLING]: getNodeInfo({
    question: 'Want to start writing code without additional installations?',
    leftAnswer: 'Yes',
    leftId: LANGUAGES.JS,
    rightAnswer: 'I can install everything that is needed',
    rightId: QUESTION_ID.MOBILE_NATIVE_APPS
  }),

  [LANGUAGES.JS]: getNodeLanguage(LANGUAGES.JS),

  [QUESTION_ID.MOBILE_NATIVE_APPS]: getNodeInfo({
    question: 'Would you like to try native mobile app development?',
    leftAnswer: 'Yes',
    leftId: QUESTION_ID.IOS_AND_ANDROID,
    rightAnswer: 'No',
    rightId: QUESTION_ID.SITE_WITH_ADMIN_PANEL,
  }),

  [QUESTION_ID.IOS_AND_ANDROID]: getNodeInfo({
    question: 'Do you want to write applications that are supported by both IOS and Android?',
    leftAnswer: 'Yes',
    leftId: LANGUAGES.RN,
    rightAnswer: 'No, only one',
    rightId: QUESTION_ID.WHICH_MOBILE_OS,
  }),

  [LANGUAGES.RN]: getNodeLanguage(LANGUAGES.RN),

  [QUESTION_ID.WHICH_MOBILE_OS]: getNodeInfo({
    question: 'For which mobile OS do you want to write applications?',
    leftAnswer: 'IOS',
    leftId: LANGUAGES.SWIFT,
    rightAnswer: 'Android',
    rightId: LANGUAGES.JAVA_KOTLIN,
  }),

  [LANGUAGES.SWIFT]: getNodeLanguage(LANGUAGES.SWIFT),

  [LANGUAGES.JAVA_KOTLIN]: getNodeLanguage(LANGUAGES.JAVA_KOTLIN),

  [QUESTION_ID.SITE_WITH_ADMIN_PANEL]: getNodeInfo({
    question: 'Do you want to make your site with authorization and settings panel here and now?',
    leftAnswer: 'Yes',
    leftId: LANGUAGES.PHP,
    rightAnswer: 'No',
    rightId: QUESTION_ID.USE_AI,
  }),

  [LANGUAGES.PHP]: getNodeLanguage(LANGUAGES.PHP),

  [QUESTION_ID.USE_AI]: getNodeInfo({
    question: 'Are you interested in developing with artificial intelligence (AI)?',
    leftAnswer: 'Yes',
    leftId: LANGUAGES.PYTHON,
    rightAnswer: 'No',
    rightId: QUESTION_ID.KEEP_BITES_ON_CONTROL,
  }),

  [LANGUAGES.PYTHON]: getNodeLanguage(LANGUAGES.PYTHON),

  [QUESTION_ID.KEEP_BITES_ON_CONTROL]: getNodeInfo({
    question: 'Want to keep all the bytes under control?',
    leftAnswer: 'Yes',
    leftId: LANGUAGES.Cpp,
    rightAnswer: 'No',
    rightId: QUESTION_ID.LIKE_USE_TEMPLATE,
  }),

  [LANGUAGES.Cpp]: getNodeLanguage(LANGUAGES.Cpp),

  [QUESTION_ID.LIKE_USE_TEMPLATE]: getNodeInfo({
    question: 'Love using patterns and would like to apply them in programming?',
    leftAnswer: 'No, no "magic"',
    leftId: LANGUAGES.JAVA,
    rightAnswer: 'Так',
    rightId: LANGUAGES.RUBY,
  }),

  [LANGUAGES.JAVA]: getNodeLanguage(LANGUAGES.JAVA),
  [LANGUAGES.RUBY]: getNodeLanguage(LANGUAGES.RUBY),
};

const FirstLanguageForm = ({className}) => {
  const initNodeId = QUESTION_ID.YOU_WANT_WORK_ON;
  const [nodeId, setNodeId] = useState(initNodeId);

  const currentNode = nodesInfo[nodeId];
  const {isFinal, languageKey} = currentNode;

  const language = isFinal
    ? languages[languageKey]
    : null;

  const questionNode = currentNode ?? nodesInfo[initNodeId];

  const reset = () => {
    setNodeId(initNodeId);
  };

  const handleSelectAnswer = (id) => setNodeId(id);

  return (
    <div className={className}>
      {
        language ? (
          <LanguageResult
            {...language}
            handeReset={reset}
          />
        ) : (
          <QuestionBlock
            {...questionNode}
            handleSelectAnswer={handleSelectAnswer}
          />
        )
      }
    </div>
  )
};

export default FirstLanguageForm;