import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Welcome() {
    const auth = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between bg-light text-dark px-4 py-5">

      {/* Main Content */}
      <main className="text-center">
        <div className="mb-5">
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-primary">Chattrix</span>
          </h1>
          <p className="lead mt-3">
            A fast, secure platform to chat, share files, and create groups in real time.
          </p>
        </div>

        <div className="row w-100 row-cols-1 row-cols-md-3 g-4 justify-content-center">
          <div className="col">
            <div className="card bg-white text-dark h-100 shadow-sm border border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">💬 Real-time Chat</h5>
                <p className="card-text">Message friends and colleagues instantly across devices.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card bg-white text-dark h-100 shadow-sm border border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">📎 File Sharing</h5>
                <p className="card-text">Send and receive images, documents, and more with ease.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card bg-white text-dark h-100 shadow-sm border border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">👥 Create Groups</h5>
                <p className="card-text">Start private or public group chats in seconds.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-4">
          <Link to={auth?"/chat":"/login"} className="btn btn-primary btn-lg fw-semibold px-4 py-2">
            Start Chatting
          </Link>
        </div>
      </main>

     
    </div>
  );
}
