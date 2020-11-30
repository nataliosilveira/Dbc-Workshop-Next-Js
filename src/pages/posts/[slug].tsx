import { GetServerSideProps } from 'next';
import { Title } from '../../styles/pages/Home';
import {Imagem} from '../../styles/pages/posts';
import parse  from 'html-react-parser';

interface post{
  id: number,
  slug: string,
  categoria_id: string,
  title: string,
  shortDescription: string
  body: string;
  image:string
}

interface Postlist{
  listadeposts: post[]
}
export default function Posts({listadeposts}: Postlist) {

  return (
    <div>      
     
      {listadeposts.map(field => {
        return(
          <div key={field.id}>
             <Title >{field.title}</Title>
             <Imagem src={field.image} alt={field.slug} />
             <div>
             {parse(field.body)}
             </div>
          </div>
        ) 
         
      })}
          
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Postlist> = async (context) => {
  const {slug} = context.params
  const response = await fetch(`http://localhost:3333/posts?slug=${slug}`);
  const listPosts = await response.json();

  return{
    props:{
      listadeposts: listPosts
    }
  }
}
