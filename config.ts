import { config } from 'dotenv';

config();
const sonarToken = process.env.REACT_APP_SONARQUBE_TOKEN;
export default sonarToken;
