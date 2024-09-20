export const test = async (req, res)=>{
    try {
        res.json("hello")
    }catch(error){
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
}