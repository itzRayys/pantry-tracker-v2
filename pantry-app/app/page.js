'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, doc, query, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')
  
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    
    updatePantry()
  }, [])  
  
const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'pantry'), item)
  await setDoc(docRef, {})
  await updatePantry()
}

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'pantry'), item)
  await deleteDoc(docRef)
  await updatePantry()
}


  return (
    <Box
      width='100vw'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={'10px'}
    >
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width={'100%'} direction={'row'} spacing={2}>
            <TextField 
              id="outlined-basic" 
              label="Item Name" 
              variant="outlined" 
              fullWidth 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="outlined" 
              onClick={() => {
                addItem(itemName)
                handleClose()  
                setItemName('')
              }}
              >
              Add
            </Button>
      </Stack>
        </Box>
      </Modal>

      <Box border={'3px solid #333'}>
        <Box width={'800px'} height='100px' bgcolor={'#eddba4'} display={'flex'} justifyContent={'center'} alignItems={'center'} borderBottom={'3px solid #333'}>
          <Typography variant="h2" color={'#333'} textAlign={'center'}>Pantry Items</Typography></Box>
        <Stack width='800px' height='500px' spacing={2} overflow={'auto'}>
          {pantry.map((i) => (
            <Box
                key={i}
                width='100%'
                height='300px'
                display={'flex'}
                justifyContent={'space-between'}
                padding={2}
                paddingX={5}
                alignItems={'center'}
                bgcolor={'#f0f0f0'}>
                  <Typography
                    variant={"h3"}
                    color={'#333'}
                    textAlign={'center'}
                  >{i.charAt(0).toUpperCase() + i.slice(1)}</Typography>
                <Button variant="contained" onClick={() => removeItem(i)}>Remove</Button>
              </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
