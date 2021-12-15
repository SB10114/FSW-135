import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function IssuesForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const {addIssues} = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addIssues(inputs)
    setInputs(initInputs)
  }

  const { title, description, imgUrl } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button>Add Issue</button>
    </form>
  )
}