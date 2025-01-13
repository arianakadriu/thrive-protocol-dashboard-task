export interface IProps {
  error: string;
}
const ErrorText: React.FC<IProps> = ({ error }) => (
  <div className="max-w-7xl mx-auto text-center">
    <div className="text-xl text-red-600 font-semibold">Error:</div>
    <div className="text-center text-lg text-gray-700 mt-2">{error}</div>
  </div>
);

export default ErrorText;
