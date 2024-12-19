class CommonUtil {
    static oneMonthAgo = () => {
      const now = new Date();
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return oneMonthAgo;
    };
  }
  
  export default CommonUtil;
  