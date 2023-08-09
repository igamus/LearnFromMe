from .db import db, add_prefix_for_prod, environment, SCHEMA


class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # columns
    id = db.Column(db.Integer, primary_key=True)
    development = db.Column(db.Boolean, nullable=False)
    business = db.Column(db.Boolean, nullable=False)
    finance = db.Column(db.Boolean, nullable=False)
    it = db.Column(db.Boolean, nullable=False)
    productivity = db.Column(db.Boolean, nullable=False)
    personal_development = db.Column(db.Boolean, nullable=False)
    design = db.Column(db.Boolean, nullable=False)
    marketing = db.Column(db.Boolean, nullable=False)
    health = db.Column(db.Boolean, nullable=False)
    music = db.Column(db.Boolean, nullable=False)

    # relationship attributes
    # user = db.relationship("User", back_populates="")
    # only many-to-many for these

    def to_dict(self):
        return {
            "id": self.id,
            "development": self.development,
            "business": self.business,
            "finance": self.finance,
            "it": self.it,
            "productivity": self.productivity,
            "personal_development": self.personal_development,
            "design": self.design,
            "marketing": self.marketing,
            "health": self.health,
            "music": self.music
        }
