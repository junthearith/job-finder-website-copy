import React, { useEffect } from "react";
import ProfileDetailComponent from "../Components/profile-detail/ProfileDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/features/user/userSlice";
import Metadata from '../lib/Metadata';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile(accessToken));
    }
  }, [accessToken, dispatch]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (!user) {
    return <div>Please log in to see your profile.</div>;
  }

  return (
    <>
      <Metadata
        title={`${user.username}'s Profile`}
        description={`View the profile of ${user.username}`}
        author={user.username}
        keywords="profile, user, details"
        thumbnail={user.avatar || 'https://example.com/default-avatar.jpg'}
        url={`https://example.com/profile`}
        type="profile"
      />
      <div className="mt-20">
        <ProfileDetailComponent
          username={user?.username}
          first_name={user?.first_name}
          last_name={user?.last_name}
          email={user?.email}
          address={user?.address}
          bio={user?.bio}
          phone_num={user?.phone_number}
          gender={user?.gender}
          contact_info={user?.contact_info}
          avatar={user?.avatar}
        />
      </div>
    </>
  );
};

const LoadingComponent = () => <div>Loading...</div>;

const ErrorComponent = ({ message }) => <div>Error: {message}</div>;

export default ProfilePage;
