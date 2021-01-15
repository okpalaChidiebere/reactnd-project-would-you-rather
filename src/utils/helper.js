
export function add3Dots(string, limit)
{
  var dots = "...";
  if(string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }
 
    return string;
}

export const isAnswered = (questions, questionId, authedUser) => {

  return questions[questionId].optionOne.votes.includes(authedUser) 
  || questions[questionId].optionTwo.votes.includes(authedUser)
}

