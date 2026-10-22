import './StatusMessage.css';

interface StatusMessageProps {
  type: 'idle' | 'loading' | 'error';
  onRetry?: () => void;
}

function StatusMessage({ type, onRetry }: StatusMessageProps) {
  if (type === 'idle') {
    return (
      <div className="status status--idle">
        <p className="status__text">Chọn thành phố</p>
      </div>
    );
  }

  if (type === 'loading') {
    return (
      <div className="status status--loading">
        <div className="status__spinner" />
        <p className="status__text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="status status--error">
      <span className="status__icon">⚠️</span>
      <p className="status__text">Không thể tải dữ liệu thời tiết</p>
      {onRetry && (
        <button className="status__retry" onClick={onRetry}>
          🔄 Thử lại
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
