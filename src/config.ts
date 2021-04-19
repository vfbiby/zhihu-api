interface IConfigProps {
  connectionUrl: string;
  secret: string;
}

const config: IConfigProps = {
  connectionUrl:
    'mongodb://localhost:27017/zhihu',
  secret: 'zhihu-jwt-api-secret',
};

export default config;
