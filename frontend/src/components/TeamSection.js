import React from 'react';
import './TeamSection.css';

const TeamSection = () => {
  return (
    <section className="team">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <div className="member">
          <img src="../dung_member2.jpg" alt="Manh Dung Nguyen" className="member-photo" />
          <h3>Manh Dung Nguyen</h3>
          <p className="position">Frontend Developer</p>
          <p>Skilled in React and UI design, Manh is passionate about crafting visually appealing user interfaces.</p>
        </div>
        <div className="member">
          <img src='../duc_member1.jpg' alt="Vu Duc Tran" className="member-photo" />
          <h3>Vu Duc Tran</h3>
          <p className="position">Backend Developer</p>
          <p>Vu specializes in server-side development, ensuring our applications are fast and secure.</p>
        </div>
        
        <div className="member">
          <img src="../minh_member3.png" alt="Tran Quang Minh Nguyen" className="member-photo" />
          <h3>Tran Quang Minh Nguyen</h3>
          <p className="position">Data Analyst</p>
          <p>With a keen eye for data, Tran turns raw data into actionable insights for strategic decision-making.</p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
