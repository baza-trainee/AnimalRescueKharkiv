export const getTimezoneOffsetForLocation = async (location: string): Promise<number | null> => {
    try {
      const response = await fetch(`https://timeapi.io/api/timezone/zone?timeZone=${location}`);
      
      if (!response.ok) {
        console.error('Failed to fetch timezone data');
        return null;
      }
      
      const data = await response.json();
      const utcOffset = data.currentUtcOffset.seconds;
      const hours = utcOffset/60/60;
      return hours;
    } catch (error) {
      console.error('Error fetching timezone offset:', error);
      return null;
    }
  };