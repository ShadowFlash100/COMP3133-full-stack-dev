function angle_Type(angle){
 if(angle < 90){
     console.log('Acute angle')
 }
 else if(angle == 90){
     console.log("Right angle")
 }
 else if(angle > 90 && angle < 180){
     console.log("Obtuse Angle")
 }
 else if(angle == 180){
    console.log("Straight Line")
 }
}
angle_Type(89)
angle_Type(90)
angle_Type(91)
angle_Type(180)