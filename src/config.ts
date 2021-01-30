interface IConfigProps {
  connectionUrl: string;
  secret: string;
}

const config: IConfigProps = {
  connectionUrl:
    'mongodb+srv://vfbiby:123456ab@zhihu.mmnhw.mongodb.net/zhihu?retryWrites=true&w=majority',
  secret: 'zhihu-jwt-api-secret',
};

export default config;
