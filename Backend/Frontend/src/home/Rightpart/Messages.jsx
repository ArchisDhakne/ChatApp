import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../context/useGetMessages';
import Loading from '../../components/Loading.jsx';
import useGetSOcketMessage from '../../context/useGetSOcketMessage';

function Messages() {
  const { loading, messages } = useGetMessages();

  useGetSOcketMessage(); //listening incoming messages

  const lastMesRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMesRef.current) {
        lastMesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100 );
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: 'calc(92vh - 8vh)' }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMesRef}>
            <Message message={message}/>
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">Say Hi to start the conversation</p>
        </div>
      )}

      {/* Add this empty div for scrollIntoView */}
      <div ref={lastMesRef}></div>
    </div>
  );
}

export default Messages;
