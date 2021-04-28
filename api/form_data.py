import json
import datetime
from dataclasses import dataclass


@dataclass
class VacationReport:
    name: str
    id: str
    apply_date: datetime.date
    type: int

    reason: str
    address: str
    postalCode:str
    phoneNumber:str
    etc:str

@dataclass
class Duration:
    start:datetime.date
    end:datetime.date