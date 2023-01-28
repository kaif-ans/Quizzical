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
        <div className="ques-ans">
          <p>{q.question}</p>
          {q.incorrect_answers.map((o) => (
            <button
              className="opt-btn"
              onClick={() => handleClick(q.id, o.id)}
              // style={{background: checkAns ? q.correct_answer}}
              style={{ background: o.isCheck ? "gray" : "" }}
            >
              {o.option}
            </button>
          ))}
          <hr />
        </div>
      ))}
      <div>
        <p>{checkAns && `You scored 3/5 correct answers`}</p>
        <button onClick={handleChange}>
          {checkAns ? "Play again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}

export default Questions;
