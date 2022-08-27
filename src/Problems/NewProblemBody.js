import NewIO from "./NewIO";
import NewStatement from "./NewStatement";
import NewTags from "./NewTags";

function NewProblemBody({ problem, setProblem, page }) {
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setProblem((oldProblem) => ({
      ...oldProblem,
      [name]: value,
    }));
    console.log(name);
    console.log(value);
    console.log(problem);
  };

  const handleMarkDownChange = (event) => {
    console.log(problem.description);
    setProblem((oldProblem) => ({
      ...oldProblem,
      description: event,
    }));
  };

  const components = {
    statement: (
      <NewStatement
        problem={problem}
        setProblem={setProblem}
        handleTextChange={handleTextChange}
        handleMarkDownChange={handleMarkDownChange}
      />
    ),
    // editorial: <NewEditorial handleMarkDownChange={handleMarkDownChange} />,
    tags: <NewTags problem={problem} setProblem={setProblem} />,
    input_output: <NewIO problem={problem} setProblem={setProblem} />,
  };
  return components[page];
}
export default NewProblemBody;
