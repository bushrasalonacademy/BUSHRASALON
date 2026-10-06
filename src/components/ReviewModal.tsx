import React, { useState } from 'react';
import { api } from '../services/api';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewAdded,
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await api.createReview({
        author_name: name,
        author_role: 'Client',
        location: 'Indore',
        rating,
        content,
        is_approved: true,
      });

      setSuccess(true);
      onReviewAdded();
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setName('');
        setContent('');
      }, 2000);
    } catch (err) {
      console.error('Review error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Write a Review
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Share your experience with NSalon - Vijay Nagar, Indore
        </p>

        {success ? (
          <div className="text-center py-6">
            <i className="fa-solid fa-circle-check text-green-500 text-4xl mb-2"></i>
            <p className="text-sm font-semibold text-gray-800">
              Thank you for your feedback!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-amber-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="How was your styling, hair treatment or makeover session?"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#2b161b] hover:bg-[#c88132] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
