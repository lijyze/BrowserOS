import React, {useState, useEffect} from 'react'

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  // 时钟
  useEffect(() => {
    const key = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {clearInterval(key)};
  }, [])

  const getTimeString: (time: Date, format?: string) => string = time => {
    enum days {
      日, 一, 二, 三, 四, 五, 六
    }
    // const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    const second = time.getSeconds().toString().padStart(2, '0');

    return `${month}月${date}日 周${days[day]}  ${hour}:${minute}:${second}`
  }

  return (
    <>{getTimeString(time)}</>
  )
}

export default Time
