import {  GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Title } from '../../styles/pages/Home';

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
 const router = useRouter();
  if(router.isFallback){
    return <h1>Carregando ...</h1>
  }

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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categorires');
  const listCategories = await response.json();

  const paths = listCategories.map(category => {
    return{
      params: {slug: category.id}
    }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Postlist> = async (context) => {
  const {slug} = context.params
  const response = await fetch(`http://localhost:3333/posts?categoria_id=${slug}`);
  const listPosts = await response.json();

  return{
    props:{
      listadeposts: listPosts
    },
    revalidate: 5,
  }
}
