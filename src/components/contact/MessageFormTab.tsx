
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';
import { toast } from 'sonner';

const MessageFormTab = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Prepare template parameters
      const templateParams = {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
        to_email: 'sarthakrawat525@gmail.com'
      };
      
      // Send email using EmailJS
      await emailjs.send(
        'service_xp1s0k6',
        'template_ewaxrsn',
        templateParams,
        '9IPagkffYxrAiin7j'
      );
      
      setSent(true);
      toast.success('Message sent successfully!');
      
      // Reset form after a delay
      setTimeout(() => {
        setSent(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-terminal-accent font-bold">Send Me a Message</h3>
      
      {sent ? (
        <div className="bg-terminal-success/20 border border-terminal-success text-terminal-success p-4 rounded animate-fade-in">
          Message sent successfully! I'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
            />
          </div>
          
          <button
            type="submit"
            disabled={sending}
            className="bg-terminal-accent text-white px-4 py-2 rounded flex items-center justify-center hover:bg-terminal-accent/80 transition-colors"
          >
            {sending ? (
              <>Sending<span className="animate-pulse">...</span></>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageFormTab;
