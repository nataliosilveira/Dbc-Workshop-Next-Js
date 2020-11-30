import {  GetStaticProps } from 'next';
import { Title } from '../styles/pages/Home';

interface post{
  id: number,
  categoria_id: string,
  title: string,
  shortDescription: string
  body: string;
  image:string
}

interface Postlist{
  listadeposts: post[]
}
export default function Home({listadeposts}: Postlist) {

  return (
    <div>
      <Title>Static site Generation</Title>
      <ul>
      {listadeposts.map(field => {
        return(
          <li key={field.id}>{field.title}</li>
        )
      })}
      </ul>      
    </div>
  );
}

export const getStaticProps: GetStaticProps<Postlist> = async () => {
  const response = await fetch('http://localhost:3333/posts');
  const listPosts = await response.json();

  return{
    props:{
      listadeposts: listPosts
    },
    revalidate: 5,
  }
}
