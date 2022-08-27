// import { WithContext as ReactTags } from 'react-tag-input';
// import TagEditor from 'react-tageditor';
import { Button, Input } from "antd";

function NewTags({ problem, setProblem }) {
  const handleRoleChange = (event, index) => {
    const { name, value } = event.target;
    const newroles = problem.roles;
    newroles[index][name] = value;
    setProblem((oldProblem) => ({
      ...oldProblem,
      roles: newroles,
    }));
  };

  const handleRemoveRole = (index) => {
    const newroles = problem.roles;
    newroles.splice(index, 1);
    setProblem((oldProblem) => ({
      ...oldProblem,
      roles: newroles,
    }));
  };

  const handleAddRole = () => {
    const newroles = [...problem.roles, { role: "" }];
    setProblem((oldProblem) => ({
      ...oldProblem,
      roles: newroles,
    }));
  };

  const handleCompanyChange = (event, index) => {
    const { name, value } = event.target;
    const newCompanies = problem.companies;
    newCompanies[index][name] = value;
    setProblem((oldProblem) => ({
      ...oldProblem,
      companies: newCompanies,
    }));
  };

  const handleRemoveCompany = (index) => {
    const newCompanies = problem.companies;
    newCompanies.splice(index, 1);
    setProblem((oldProblem) => ({
      ...oldProblem,
      companies: newCompanies,
    }));
  };

  const handleAddCompany = () => {
    const newCompanies = [...problem.companies, { company: "" }];
    setProblem((oldProblem) => ({
      ...oldProblem,
      companies: newCompanies,
    }));
  };

  const handleSubcategoryChange = (event, index) => {
    const { name, value } = event.target;
    const newSubcategories = problem.subcategories;
    newSubcategories[index][name] = value;
    setProblem((oldProblem) => ({
      ...oldProblem,
      subcategories: newSubcategories,
    }));
  };

  const handleRemoveSubcategory = (index) => {
    const newSubcategories = problem.subcategories;
    newSubcategories.splice(index, 1);
    setProblem((oldProblem) => ({
      ...oldProblem,
      subcategories: newSubcategories,
    }));
  };

  const handleAddSubcategory = () => {
    const newSubcategories = [
      ...problem.subcategories,
      { subcategory: "", category: "" },
    ];
    setProblem((oldProblem) => ({
      ...oldProblem,
      subcategories: newSubcategories,
    }));
  };

  return (
    <div>
      <h2 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Add Roles</h2>
      {problem.roles.map((x, i) => {
        return (
          <div>
            <div className="input-row--left">
              <label htmlFor="role">Role</label>
              <Input
                id="role"
                name="role"
                value={problem.roles[i].role}
                onChange={(event) => handleRoleChange(event, i)}
                placeholder="Enter role..."
              />
              {problem.roles.length !== 1 && (
                  <Button
                    type="primary"
                    onClick={() => handleRemoveRole(i)}
                    shape="round"
                    size="large"
                    style={{  margin: "0px 10px"}}
                  >
                    Remove
                  </Button>
                  
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={() => handleRemoveRole(i)}
                // >
                //   Remove
                // </button>
              )}
              {problem.roles.length - 1 === i && (
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={handleAddRole}
                // >
                //   Add More
                // </button>
                <Button
                  type="primary"
                  onClick={() => handleAddRole()}
                  shape="round"
                  size="large"
                  style={{  margin: "0px 10px" }}
                >
                  Add More
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <h2 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Add Companies</h2>
      {problem.companies.map((x, i) => {
        return (
          <div>
            <div className="input-row--left">
              <label htmlFor="company">Company</label>
              <Input
                id="company"
                name="company"
                value={problem.companies[i].company}
                onChange={(event) => handleCompanyChange(event, i)}
                placeholder="Enter company..."
              />
              {problem.companies.length !== 1 && (
                <Button
                  type="primary"
                  onClick={() => handleRemoveCompany(i)}
                  shape="round"
                  size="large"
                  style={{ margin: "0px 10px"}}
                >
                  Remove
                </Button>
                
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={() => handleRemoveCompany(i)}
                // >
                //   Remove
                // </button>
              )}
              {problem.companies.length - 1 === i && (
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={handleAddCompany}
                // >
                //   Add More
                // </button>
                <Button
                  type="primary"
                  onClick={() => handleAddCompany()}
                  shape="round"
                  size="large"
                  style={{  margin: "0px 10px"}}
                >
                  Add More
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <h2 style={{ paddingTop: "20px", paddingLeft: "20px" }}>
        Add Subcategories
      </h2>
      {problem.subcategories.map((x, i) => {
        return (
          <div>
            <div className="input-row--left">
              <label htmlFor="subcategory">Subcategories</label>
              <Input
                id="subcategory"
                name="subcategory"
                value={problem.subcategories[i].subcategory}
                onChange={(event) => handleSubcategoryChange(event, i)}
                placeholder="Enter subcategory..."
              />
              <label htmlFor="category" style={{ paddingLeft: "20px" }}>
                Categories
              </label>
              <Input
                id="category"
                name="category"
                value={problem.subcategories[i].category}
                onChange={(event) => handleSubcategoryChange(event, i)}
                placeholder="Enter category..."
              />
              {problem.subcategories.length !== 1 && (
                <Button
                  type="primary"
                  onClick={() => handleRemoveSubcategory(i)}
                  shape="round"
                  size="large"
                  style={{  margin: "0px 10px"}}
                >
                  Remove
                </Button>
              
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={() => handleRemoveSubcategory(i)}
                // >
                //   Remove
                // </button>
              )}
              {problem.subcategories.length - 1 === i && (
                // <button
                //   className="submit-btn"
                //   type="button"
                //   onClick={handleAddSubcategory}
                // >
                //   Add More
                // </button>
                <Button
                  type="primary"
                  onClick={() => handleAddSubcategory()}
                  shape="round"
                  size="large"
                  style={{ margin: "0px 10px"}} 
                >
                  Add More
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // const delimiters = [13] // code for enter
  // const [roles, setRoles] = useState([]);

  // const handleRoleChange = (rolesChanged, allRoles, action) => {
  //     setProblem(oldProblem => (
  //         {
  //             ...oldProblem,
  //             roles: allRoles
  //         }
  //     ))

  // }

  // const handleCompanyChange = (companyChanged, allCompanies, action) => {
  //     setProblem(oldProblem => (
  //         {
  //             ...oldProblem,
  //             companies: allCompanies
  //         }
  //     ))
  // }

  // const handleSubCategoryChange = (subcategoryChanged, allSubcategories, action) => {
  //     setProblem(oldProblem => (
  //         {
  //             ...oldProblem,
  //             subcategories: allSubcategories
  //         }
  //     ))

  //     console.log(problem)
  // }

  // return (
  //     <div className='input--tags'>
  //         <br />
  //         <label htmlFor='roles'><h2>Add Job Roles</h2></label>
  //         <br />
  //         <TagEditor
  //         tags={problem.roles}
  //         delimiters={delimiters}
  //         placeholder="click here to add roles..."
  //         onChange={handleRoleChange}
  //         id='roles'
  //         />

  //         <br />
  //         <label htmlFor='companies'><h2>Add Companies</h2></label>
  //         <br />
  //         <TagEditor
  //         tags={problem.companies}
  //         delimiters={delimiters}
  //         placeholder="click here to add companies..."
  //         onChange={handleCompanyChange}
  //         id='companies'
  //         />

  //         <br />
  //         <label htmlFor='subcategories'><h2>Add Subcategories</h2></label>
  //         <br />
  //         <TagEditor
  //         tags={problem.subcategories}
  //         delimiters={delimiters}
  //         placeholder="click here to add subcategories..."
  //         onChange={handleSubCategoryChange}
  //         id='subcategories'
  //         />
  //     </div>
  // )
}
export default NewTags;
