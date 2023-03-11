import unittest
from script import *

class FoodTest(unittest.TestCase):

    def test1(self):
        print("Print test 1...")
        self.foo = FoodRecipes()
        self.assertEqual(self.foo.setCalorieRange(), 300)

    def test2(self):
        print("Printing test 2...")
        self.foo = FoodRecipes()
        self.assertEqual(self.foo.setCalorieRange(), 900)


if __name__ == "__main__":
    unittest.main()