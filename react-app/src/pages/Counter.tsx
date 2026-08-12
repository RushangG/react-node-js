import { useState } from 'react';

interface AppState {
  user: {
    name: string;
    profile: {
      age: number;
      theme: string;
    };
  };
}

export default function Counter() {
  const [data, setData] = useState<AppState>({
    user: { name: "Alex", profile: { age: 25, theme: "dark" } }
  });

  const birthdayStateUpdate = () => {
    setData(prev => ({
      ...prev,                  // 1. Copy root level
      user: {
        ...prev.user,           // 2. Copy user level
        profile: {
          ...prev.user.profile, // 3. Copy profile level
          age: prev.user.profile.age + 1 // 4. Finally mutate value!
        }
      }
    }));
  };

  return <button onClick={birthdayStateUpdate}>Age: {data.user.profile.age}</button>;
}
