import unittest
from script import *

class FoodTest(unittest.TestCase):
    def setUp(self):
        print('Preparing for testing...')
        self.foo = FoodRecipes()

    def tearDown(self):
        print('Finishing and cleaning up the test...\n')

    def test1(self):
        print("Beginning test 1...")
        self.assertEqual(self.foo.setCalorieRange(), 300)

    def test2(self):
        print("Beginning test 2...")
        self.assertEqual(self.foo.setCalorieRange(), 900)

    def test3(self):
        print("Beginning test 3...")
        self.assertNotEqual(self.foo.setCalorieRange(), 850)

    def test4(self):
        print("Beginning test 4...")
        self.assertNotEqual(self.foo.setCalorieRange(), 950)

if __name__ == "__main__":
    unittest.main()