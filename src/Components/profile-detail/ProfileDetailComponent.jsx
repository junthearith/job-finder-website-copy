import React, { useState } from "react";
import PersonalInformationComponent from "./PersonalInformationComponent";
import BioComponent from "./BioComponent";
import UserProfileComponent from "./UserProfileComponent";
import SkillAndInterestComponent from "./SkillAndInterestComponent";
import SocialMediaComponent from "./SocialMediaComponent";

const ProfileDetailComponent = ({
  username,
  email,
  address,
  bio,
  phone_num,
  gender,
  created_at,
  avatar,
  cover,
  contact_info,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <section className="my-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-4 col-span-1">
          <UserProfileComponent
            avatar={avatar}
            username={username}
            created_at={created_at}
            cover={cover}
            address={address}
            setIsEditing={setIsEditing}
          />
          <BioComponent bio={bio} />
          <SkillAndInterestComponent />
          <SocialMediaComponent contact_info={contact_info} />
        </div>
        <div className="col-span-1 md:cols-span-2">
          <PersonalInformationComponent
            user_name={username}
            gender={gender}
            email={email}
            phone_num={phone_num}
            address={address}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </section>
    </>
  );
};

export default ProfileDetailComponent;
