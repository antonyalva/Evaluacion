// src/components/UserPost.jsx
import React, { useState, useEffect } from 'react';

function UserPost({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`https://dummyjson.com/users/${userId}/posts`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user posts:', error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h3>Publicaciones de Usuario {userId}</h3>
        {posts.length > 0 ? (
          <ul className="list-group list-group-flush">
            {posts.map((post) => (
              <li key={post.id} className="list-group-item">
                <h5>{post.title}</h5>
                <p>{post.body}</p>
                <p><strong>Likes:</strong> {post.reactions.likes} | <strong>Dislikes:</strong> {post.reactions.dislikes}</p>
                <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay publicaciones disponibles para este usuario.</p>
        )}
      </div>
    </div>
  );
}

export default UserPost;
