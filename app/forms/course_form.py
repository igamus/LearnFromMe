from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class CourseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Name your course!"), Length(min=5, max=255, message="Course name must be between %(min)d and %(max)d characters")])
    description = StringField('description', validators=[Length(max=255, message="Description must be less than %(max)d characters")])
    course_image = StringField('course_image', validators=[Length(max=255, message="Image url must be less than %(max)d characters")]) # Make required later
    price = IntegerField('price', validators=[DataRequired(), NumberRange(min=0, message="Price must be more than 0")])
    level = StringField("level", validators=[DataRequired(message="Must describe proficiency level")])
    what_youll_learn = StringField("what_youll_learn", validators=[DataRequired(message="Must describe course contract")])
    course_video = StringField("course_video", validators=[DataRequired(message="You must include your course!")]) # integrate with aws

# reuse in edit -- not sure you need to build out a new one, if so --- rename to course form
