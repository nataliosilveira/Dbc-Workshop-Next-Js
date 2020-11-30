import {useEffect, useState} from 'react'
import { Title } from '../styles/pages/Home';

interface post{
  id: number,
  categoria_id: string,
  title: string,
  shortDescription: string
  body: string;
  image:string
}

export default function Home() {

  const [posts, setPosts] = useState<post[]>([])

  useEffect(()=> {
    fetch('http://localhost:3333/posts').then(response => {response.json().then(data => {setPosts(data)})})
  },[])

  return (
    <div>
      <Title>Client Side Fetching</Title>
      <ul>
      {posts.map(field => {
        return(
          <li>{field.title}</li>
        )
      })}
      </ul>      
    </div>
  );
}
