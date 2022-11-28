import {
  _saveQuestion,
  _saveQuestionAnswer
} from '../../utils/_DATA.js';

const question = {
  optionOneText: "program in Ruby",
  optionTwoText: "program in Python",
  author: "gn09"
}

const incorrectQuestion = {
  optionOneTest: "work with AWS",
  optionTwoText: "work with Azure",
  author: "gn09"
}

describe('_saveQuestion', () => {
  it('it returns', async() => {
    var result = await _saveQuestion(question);
    expect(result).toReturn
  });

  it('returns saved question with all expected fields', async () => {
    var result = await _saveQuestion(question);
    expect(result.optionOne.text).toEqual(question.optionOneText)
    expect(result.optionTwo.text).toEqual(question.optionTwoText)
    expect(result.author).toEqual(question.author)
  });

  it('returns an error when passing incorrect data', async () => {
    await expect(_saveQuestion(incorrectQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
  });
});

const questionAnswer = {
  authedUser: "gn09",
  qid: "xj352vofupe1dqz9emx13r",
  answer: "optionTwo"
}

const incorrectQuestionAnswer = {
  authUser: "gn09",
  qid: "xj352vofupe1dqz9emx13r",
  answer: "optionTwo"
}

describe(_saveQuestionAnswer, () => {
  it('it returns', async() => {
    var result = await _saveQuestionAnswer(questionAnswer);
    expect(result).toReturn
  });

  it('returns saved answer with all expected fields', async() => {
    var result = await _saveQuestionAnswer(questionAnswer);
    expect(result).toEqual(true);
  });
  
  it('returns an error when passing incorrect data', async () => {
    await expect(_saveQuestion(incorrectQuestionAnswer)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
  })
});