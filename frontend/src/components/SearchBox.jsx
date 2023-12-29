import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || "")

    const submiteHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            setKeyword('')
            navigate(`/search/${keyword}`)
        }else{
            navigate("/")
        }
    }

    return (
        <Form onSubmit={submiteHandler} className='d-flex'>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5"
                autoComplete="off"
            ></Form.Control>
            <Button type="submit" variant="dark"  className="p-1 mx-2">Search</Button>
        </Form>
    )
}

export default SearchBox
