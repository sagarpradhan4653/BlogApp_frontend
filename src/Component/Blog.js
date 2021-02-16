import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog,
    faBookReader,
    faCoffee, 
    faEdit, 
    faFilter, 
    faHeading, 
    faImages, 
    faPlusCircle, 
    faRecycle, 
    faShapes, 
    faTable, 
    faTrashAlt, 
    faUserSecret 
} from '@fortawesome/free-solid-svg-icons'

function Blog(props) {

    const [data, setData] = useState([])
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(-1)

    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [date,setDate] = useState(0)
    const [description,setDescription] = useState('')

    const [token_id ,setTokenId ] = useState(0)

    const [picture, setPicture] = useState('')

    const [g, setG] = useState(null)



    useEffect(()=>{
        if(!props.mainToken){
            props.history.push('/Login')
        }
    },[])



    const getData = () => {
        axios.get('http://127.0.0.1:8000/bloggers/')
        .then(res => {
            setData(res.data)
            console.log(res.data)
            props.send_user_data(res.data)
            
        })
    }

    console.log("Abhishek Sir",data)

    
    useEffect(()=>{
        // getData()
        setTokenId(props.token_with_id)
        getData()
    },[])

    const handleUpolad = event => {
        event.preventDefault();
        setPicture(event.target.files[0])

        // setUpdatePic(event.target.files[0].name)
        
        console.log("dddddddddddd",event.target.files[0].name);
        setG(-1)


        // let data = new FormData();
        // data.append('picture', picture)
        // setUpdatePic(data)



      }

    // pushing the data into a server
    const postData = (e) => {
        e.preventDefault()
        setEdit(-1)
        
        let data = new FormData();
        data.append('user', `http://127.0.0.1:8000/users/${token_id}/`)
        data.append('title', e.currentTarget['title'].value)
        data.append('description',e.currentTarget['description'].value )
        data.append('date',e.currentTarget['date'].value)
        data.append('category',e.currentTarget['category'].value)
        data.append('picture', picture)

        

        axios.post('http://127.0.0.1:8000/bloggers/', data)
            .then(res => {
                console.log(res.data);
                getData() // it will call to render the page for showing the data
                setTitle('')
                setDescription('')
                setDate(0)
                setCategory('')
                getData()    
                

            })
    }

    const deleteBlog = (i) =>{ // for deleting blog
        axios.delete(`http://127.0.0.1:8000/bloggers/${i}/`)
        .then(res => {
            console.log(res.data);
            getData() // when delete button will click it will call the getData function for render the component

        })

    }


    const updateBlogData = (e,id) =>{ // for updating data of blog
        e.preventDefault()
        setEdit(-1) // for changing the value of edit again zero


        let data = new FormData();
        data.append('user', `http://127.0.0.1:8000/users/${token_id}/`)
        data.append('title', e.currentTarget['title'].value)
        data.append('description',e.currentTarget['description'].value )
        data.append('date',e.currentTarget['date'].value)
        data.append('category',e.currentTarget['category'].value)
        g != null && data.append('picture', picture)
        
        axios.put(`http://127.0.0.1:8000/bloggers/${id}/`,data)
        .then(resp=>{
            console.log(resp.data);
            //for set the value of input empty
            setTitle('')
            setDescription('')
            setDate(0)
            setCategory('')
            getData()
            setPicture('')
        })        
    }

    const editTakeId = (d,t,desc,dat,cat,pict)=>{

            setId(d)
            setEdit(d)
            setTitle(t)
            setDescription(desc)
            setDate(dat)
            setCategory(cat)
            setPicture(pict)
            



    }

    

    const modalView = (key_id,t,desc,dat,cat,pic)=>{
        // setKeyId(key_id)

        setTitle(t)
        setDescription(desc)
        setDate(dat)
        setCategory(cat)
        setPicture(pic)

        console.log("take Key id",key_id);
        
    }

    const closeModal = ()=>{
        setTitle('')
        setDescription('')
        setDate(0)
        setCategory('')
        setPicture('')
        getData()
        setG(null)
        
    }

    console.log("data check from state",props.getUserData);

    return (

        <>
            <div className="container">
                <div className="row ">
                {data.map(item =>
                    <div className=" col-12 col-sm-8 col-md-6 col-lg-4" key={item.id} >
                    <div className="card mb-3">
                        <img  className="card-img" height={200} width={60} src={item.picture} alt="image"/>
                        <div className="card-body">
                        <h4  className="card-title">{item.title}</h4>
                        <small className="text-muted cat">
                            <i className="far fa-clock text-info"></i> 30 minutes
                            <i className="fas fa-users text-info"></i> 4 portions
                        </small>
                        <p className="card-text"><small key={item.id} className="text-muted">{item.category}</small></p>
                        <p  className="card-text">{`${item.description.slice(0,15)}.....`}</p>
                            {`http://127.0.0.1:8000/users/${props.token_with_id}/` == item.user && <button className="btn btn-sm btn-outline-primary" onClick={()=>{deleteBlog(item.id)}} ><FontAwesomeIcon icon={faTrashAlt} />Delete</button>}
                            {`http://127.0.0.1:8000/users/${props.token_with_id}/` == item.user && <button className="btn btn-sm btn-outline-dark"  data-bs-toggle="modal" data-bs-target="#staticBlog" onClick={()=>{editTakeId(item.id,item.title,item.description,item.date,item.category,item.picture)}}><FontAwesomeIcon icon={faEdit} />Edit Blog</button>}   
                            <button type="button" onClick={()=>{modalView(item.id,item.title,item.description,item.date,item.category,item.picture)}}  className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Full Blog    <FontAwesomeIcon icon={faBookReader} />
                            </button>                     
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div  className="views">{item.date}
                        </div>
                        <div className="stats">
                            <i className="far fa-eye"></i> 1347
                            <i className="far fa-comment"></i> 12
                        </div>
                        
                        </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>

            <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">BLOGs <FontAwesomeIcon icon={faBlog} /></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="col-12">
                    <div className="card ">
                        <img  className="card-img" src={picture} alt="image"/>
                        <div className="card-body">
                        <h4  className="card-title"><FontAwesomeIcon icon={faShapes} />{title}</h4>
                        <small className="text-muted cat">
                            <i className="far fa-clock text-info"></i> 30 minutes
                            <i className="fas fa-users text-info"></i> 4 portions
                        </small>
                        <p className="card-text"><small  className="text-muted">{category}</small></p>
                        <p  className="card-text">{description}</p>
                            {/* {`http://127.0.0.1:8000/users/${props.token_with_id}/` == item.user && <button className="btn btn-sm btn-outline-primary" onClick={()=>{deleteBlog(item.id)}} >Delete</button>}
                            <button className="btn btn-sm btn-outline-dark" onClick={()=>{editTakeId(item.id,item.title,item.description,item.date,item.category)}}>Edit Blog</button>                         */}
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div  className="views"><FontAwesomeIcon icon={faTable} />{date}
                        </div>
                        <div className="stats">
                            <i className="far fa-eye"></i> 1347
                            <i className="far fa-comment"></i> 12
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>

            {/* {for creating blog} */}
            {/* <button className="btn btn-lg btn-dark" data-bs-toggle="modal" data-bs-target="#staticBlog" >Write Blog</button> */}
            <div className="modal fade" id="staticBlog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"><FontAwesomeIcon icon={faBlog} />  Add Blog</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="col-12">
                    <h1><FontAwesomeIcon icon={faUserSecret} />Blog</h1><br /><br /><br />
                    <form className="row g-6" onSubmit={edit == -1 ? postData:(e)=>{updateBlogData(e,id)}}>
                        <div className="col-md-4">
                            <label for="validationDefault01" className="form-label"><FontAwesomeIcon icon={faHeading} />  Title</label>
                            <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="Type Your Username" className="form-control" id="validationDefault01" required />
                        </div>
                        <div className="col-md-4">
                            <label for="validationDefault01" className="form-label"><FontAwesomeIcon icon={faFilter} />  Category</label>
                            <input type="text" name="category" onChange={(e)=>{setCategory(e.target.value)}}  value={category} placeholder="Type Your Username" className="form-control" id="validationDefault01" required />
                        </div>
                        <div className="col-md-4">
                            <label for="validationDefault01" className="form-label"><FontAwesomeIcon icon={faTable} />date</label>
                            <input type="date" name="date"  onChange={(e)=>{setDate(e.target.value)}} value={date} placeholder="Type Your Username" className="form-control" id="validationDefault01" required />
                        </div>
                        <div className="col-md-12">
                            <label for="validationDefault02" className="form-label"><FontAwesomeIcon icon={faEdit} />description</label>
                            <textarea type="text" name="description" onChange={(e)=>{setDescription(e.target.value)}} value={description} placeholder="Type Your Blog" className="form-control" id="validationDefault02" required />
                        </div><br/>
                        <div className="col-md-6">
                                <label for="validationDefault02" className="form-label"><FontAwesomeIcon icon={faImages} />Pic</label>
                                <input type="file" onChange={handleUpolad} accept="picture/png,picture/jpg, picture/jpeg " className="form-control" id="validationDefault02" />
                            </div>
                        <div className="col-12 mt-4 " >
                            {edit == -1 ? <button className="btn btn-dark mt-3" type="submit"><FontAwesomeIcon icon={faPlusCircle} />Add Blog</button>:
                            <button className="btn btn-warning mt-3" type="submit"><FontAwesomeIcon icon={faRecycle} />Update Blog</button>}
                        </div>
                    </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <FontAwesomeIcon icon={faCoffee} />
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div> 
        </>
    )
}


const mapStateToProps = state => {
    return {
        state,
        token_with_id : state.user_id,
        mainToken: state.user_token != null ? true: false 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        send_user_data: v => dispatch({ type: 'SEND_USER_DATA', payload: v })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)










