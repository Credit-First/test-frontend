export async function httpGet(url: string): Promise<any> {
    const data = await fetch(url);
    return data.json();
}