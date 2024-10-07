const ReviewCard: React.FC<{ review: string }> = ({ review }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <p>{review}</p>
    </div>
  );

export default ReviewCard