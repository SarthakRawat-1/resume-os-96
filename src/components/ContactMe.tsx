
import React from 'react';
import { useSystem } from '../context/SystemContext';
import ContactWindow from './contact/ContactWindow';
import SocialLinksTab from './contact/SocialLinksTab';
import MessageFormTab from './contact/MessageFormTab';

const ContactMe = () => {
  const [activeTab, setActiveTab] = React.useState<'links' | 'message'>('links');
  
  return (
    <ContactWindow 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'links' ? (
        <SocialLinksTab />
      ) : (
        <MessageFormTab />
      )}
    </ContactWindow>
  );
};

export default ContactMe;
