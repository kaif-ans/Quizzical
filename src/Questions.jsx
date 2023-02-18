import React from "react";

function Questions() {
  const [ques, setQues] = React.useState([]);
  const [checkAns, setCheckAns] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQues(
          data.results.map((q, i) => ({
            ...q,
            isHeld: false,
            id: i,
            incorrect_answers: q.incorrect_answers.concat(q.correct_answer),
          }))
        )
      );
  }, []);
  // console.log(ques);

  React.useEffect(() => {
    const optionsArr = ques.map((q) => ({
      ...q,
      incorrect_answers: q.incorrect_answers.map((opt, i) => ({
        isCheck: false,
        id: i,
        option: opt,
      })),
    }));
    setUpdatedData(optionsArr);
  }, [ques]);
  console.log(updatedData);

  function handleChange() {
    //check answer btn
    setCheckAns((prev) => !prev);
    // console.log("change");
  }

  function handleClick(quesId, optId) {
    setUpdatedData((prev) =>
      prev.map((p) =>
        p.id === quesId
          ? {
              ...p,
              incorrect_answers: p.incorrect_answers.map((i) =>
                i.id === optId
                  ? { ...i, isCheck: true }
                  : { ...i, isCheck: false }
              ),
            }
          : p
      )
    );
    console.log(updatedData);
  }

  return (
    <div className="ques-pg">
      {updatedData.map((q) => (
        <div className="ques-ans" key={q.id}>
          <p>{q.question}</p>
          <div className="opt-div">
            {q.incorrect_answers.map((o) => (
              <button
                key={o.id}
                className="opt-btn"
                onClick={() => handleClick(q.id, o.id)}
                // style={{background: checkAns ? q.correct_answer}}
                // green color for correct answer - #94D7A2
                // red color for incorrect answer - #F8BCBC
                style={{ background: o.isCheck ? "#D6DBF5" : "" }}
              >
                {o.option}
              </button>
            ))}
          </div>
          <hr />
        </div>
      ))}
      <p className="score-div">
        {checkAns && `You scored 3/5 correct answers `}&nbsp;&nbsp;
        <button onClick={handleChange} className="check-ans-btn">
          {checkAns ? "Play again" : "Check answers"}
        </button>
      </p>
    </div>
  );
}

export default Questions;
