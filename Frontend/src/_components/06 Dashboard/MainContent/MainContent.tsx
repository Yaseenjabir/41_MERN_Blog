import AddPost from "./AddPost/AddPost";
import PostList from "./Postlist/PostList";

const MainContent: React.FC<{ tab: string }> = ({ tab }) => {
  return <>{tab === "Add Post" ? <AddPost /> : <PostList />}</>;
};

export default MainContent;
