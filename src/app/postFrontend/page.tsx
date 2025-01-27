'use client'
import { useEffect } from "react"

export default function Front() {
  useEffect(()=>{ 
    fetch('/postFrontend',{method:"POST"})
  })
  return (<h1>Some content</h1>)
}