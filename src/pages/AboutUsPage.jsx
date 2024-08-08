import React from 'react'
import AboutUsComponent from '../Components/about-us/AboutUsComponent'
import Metadata from '../lib/Metadata'

const AboutUsPage = () => {
  return (
    <>
      <Metadata
        title="About Us"
        description="Learn more about our company, mission, and values."
        author="Your Name"
        keywords="about us, company, mission, values"
        thumbnail="https://example.com/about-us-thumbnail.jpg"
        url="https://example.com/about-us"
        type="website"
      />
      <AboutUsComponent/>
    </>
  )
}

export default AboutUsPage
