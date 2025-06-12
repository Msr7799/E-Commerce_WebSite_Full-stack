import { motion } from 'framer-motion';
import {
  FaGithub,
  FaInstagram,
  FaSnapchatGhost,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactPage = ({ isDarkMode }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast.success('Message sent successfully!');
  };

  const contactInfo = [
    {
      platform: 'Email',
      value: 'alromaihi2224@gmail.com',
      icon: FaEnvelope,
      link: 'mailto:alromaihi2224@gmail.com'
    },
    {
      platform: 'GitHub',
      value: 'Msr7799',
      icon: FaGithub,
      link: 'https://github.com/Msr7799'
    },
    {
      platform: 'Instagram',
      value: 'Msr_99',
      icon: FaInstagram,
      link: 'https://instagram.com/Msr_99'
    },
    {
      platform: 'Snapchat',
      value: 'Msr.5',
      icon: FaSnapchatGhost,
      link: 'https://snapchat.com/Msr.5'
    }
  ];

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-pearl text-gray-900'
      }`}
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg shadow-lg p-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1 className='text-3xl font-elegant mb-6 text-center text-rose-gold'>
            Contact Us
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Contact Form */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-elegant text-rose-gold'>
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>Name</label>
                  <input
                    type='text'
                    required
                    className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-gold'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    required
                    className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-gold'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className='w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-rose-gold'
                  ></textarea>
                </div>
                <button
                  type='submit'
                  className='w-full py-2 px-4 bg-rose-gold text-white rounded-lg hover:bg-rose-600 transition-colors'
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-elegant text-rose-gold'>
                Contact Information
              </h2>
              <div className='space-y-4'>
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.a
                      key={index}
                      href={contact.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                      whileHover={{ scale: 1.02 }}
                    >
                      <Icon className='h-6 w-6 text-rose-gold' />
                      <div>
                        <p className='font-medium'>{contact.platform}</p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className='mt-8'>
                <h3 className='text-xl font-elegant text-rose-gold mb-4'>
                  Developer
                </h3>
                <p className='text-lg'>Mohammed Saud Al-Romaihi</p>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>
                  Feel free to reach out for any inquiries.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
