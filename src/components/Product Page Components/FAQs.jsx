import { Box } from '@mui/material'
import Typography from 'components/Typography'
import React from 'react'

function FAQs({
    questions,
    answers
}) {
  return (
    <div>
        <Typography variant='h6'  sx={{
            fontWeight: "Bold",
            margin: "1rem",
        }}>
            FAQs    
        </Typography>
        <Typography>
            {questions.map(({
                subject,
                description,
                user
            }) => (<Box sx={{
                margin: "1rem"
            }}>
                    <Typography sx={{
                        fontWeight: "Bold"
                    }}> 
                        Subject:
                    </Typography>
                    <Typography>
                        {subject}
                    </Typography>
                    <Typography sx={{
                        fontWeight: "Bold"
                    }}> 
                        Question: 
                    </Typography>
                    <Typography > 
                    {description} 
                    </Typography>
                </Box>
                 ))
            }
        </Typography>
    </div>
  )
}

export default FAQs