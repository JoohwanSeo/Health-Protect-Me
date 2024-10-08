import Profile from '@/components/MyPage/ProfilePage/Profile';
import PostsSection from '@/components/MyPage/ProfilePage/PostsSection';

const MyProfile = () => {
  return (
    <div className="h-full justify-between s:h-full">
      <div className="max-w-full flex justify-between s:flex-col">
        <div className="flex items-start mr-10 s:mr-0">
          <Profile />
        </div>
        <div className="ml-10 s:ml-0">
          <PostsSection />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
