import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ProblemCardTable from "./ProblemCardTable";
import "./problems.css";

const { Meta } = Card;

export default function RecommendProblems () {

    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));      

    const [problems, setProblems] = useState([]);

    useEffect(() => {

        const fetchPopular = async () => {
            axios.get("http://intdesk.herokuapp.com/problems/popular/")
            .then(res => {
        
                console.log(window.$log = res.data)
                setProblems(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
        }

        const fetchRecommended = async () => {
            axios.get("http://intdesk.herokuapp.com/problems/recommended/", {
                headers: {
                  Authorization: "Token ".concat(authToken.token),
                  "Content-Type": "application/json",
                },
            })
            .then(res => {
        
                console.log(window.$log = res.data)
                setProblems(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
        }

        if(!isLoggedIn)
        {
            fetchPopular();
        }
        else 
        {
            fetchRecommended();
        }

    }, [isLoggedIn, authToken])
    
    return (
        <ProblemCardTable problems={problems} />
    )
}