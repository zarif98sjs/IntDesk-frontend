
// import { WithContext as ReactTags } from 'react-tag-input';
import { useState } from 'react';
// import TagEditor from 'react-tageditor';

function NewTags({problem, setProblem}){

    const delimiters = [13] // code for enter
    const [roles, setRoles] = useState([]);
    

    const handleRoleChange = (rolesChanged, allRoles, action) => {
        setProblem(oldProblem => (
            {
                ...oldProblem,
                roles: allRoles
            }
        ))
        
    }

    const handleCompanyChange = (companyChanged, allCompanies, action) => {
        setProblem(oldProblem => (
            {
                ...oldProblem,
                companies: allCompanies
            }
        ))
    }


    const handleSubCategoryChange = (subcategoryChanged, allSubcategories, action) => {
        setProblem(oldProblem => (
            {
                ...oldProblem,
                subcategories: allSubcategories
            }
        ))

        console.log(problem)
    }
    
    return (
        <div className='input--tags'>
            <br />
            <label htmlFor='roles'><h2>Add Job Roles</h2></label>
            <br />
            <TagEditor
            tags={problem.roles}
            delimiters={delimiters}
            placeholder="click here to add roles..."
            onChange={handleRoleChange}
            id='roles'
            />

            <br />
            <label htmlFor='companies'><h2>Add Companies</h2></label>
            <br />
            <TagEditor
            tags={problem.companies}
            delimiters={delimiters}
            placeholder="click here to add companies..."
            onChange={handleCompanyChange}
            id='companies'
            />

            <br />
            <label htmlFor='subcategories'><h2>Add Subcategories</h2></label>
            <br />
            <TagEditor
            tags={problem.subcategories}
            delimiters={delimiters}
            placeholder="click here to add subcategories..."
            onChange={handleSubCategoryChange}
            id='subcategories'
            />
        </div>
    )

    

}
export default NewTags;