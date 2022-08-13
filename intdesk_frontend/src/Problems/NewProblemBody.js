import NewEditorial from "./NewEditorial";
import NewStatement from "./NewStatement";
import NewTags from "./NewTags";


function NewProblemBody({problem, setProblem, page}) {

    const handleTextChange = event => {
        const {name, value} = event.target;
        setProblem(oldProblem => (
            {
                ...oldProblem,
                [name]: value
            }
        ))
    }

    const handleMarkDownChange = event => {
        setProblem(oldProblem => (
            {
                ...oldProblem,
                description: event
            }
        ))
    }

    const components = {
        statement: <NewStatement handleTextChange={handleTextChange} handleMarkDownChange={handleMarkDownChange} />,
        editorial: <NewEditorial handleMarkDownChange={handleMarkDownChange} />,
        tags: <NewTags problem={problem} setProblem={setProblem}/>
    }
    return (
        components[page]
        // <NewStatement handleTextChange={handleTextChange} handleMarkDownChange={handleMarkDownChange} />
    )

}
export default NewProblemBody;