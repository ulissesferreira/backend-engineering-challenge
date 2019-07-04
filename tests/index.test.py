import os.path
import subprocess

# Multiple test scenarios
#
# Simple - Uses the provided README input and output
# 1 - Manually generated data (smallest size)
# 2 - Manually generated data
# 3 - Manually generated data
# 4 - Manually generated data
# 5 - Manually generated data (biggest size)

def test_simple():
  f1=open('tests/simple/output.json',"r")
  f2=open('tests/simple/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  README Test passed')

def test_1():
  f1=open('tests/1/output.json',"r")
  f2=open('tests/1/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  Test 1 passed')

def test_2():
  f1=open('tests/2/output.json',"r")
  f2=open('tests/2/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  Test 2 passed')

def test_3():
  f1=open('tests/3/output.json',"r")
  f2=open('tests/3/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  Test 3 passed')

def test_4():
  f1=open('tests/4/output.json',"r")
  f2=open('tests/4/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  Test 4 passed')

def test_5():
  f1=open('tests/5/output.json',"r")
  f2=open('tests/5/expected.output.json',"r")
  test_result = True

  for line1 in f1:
    for line2 in f2:
      test_result = test_result and (line1 == line2)
      break
  assert(test_result)
  print(' ✅  Test 5 passed')

if __name__ == "__main__":
  subprocess.call('node -v')
  subprocess.call('node ./src/index.js --input_file ./tests/simple/events.json --window_size 10 --output_file ./tests/simple/output.json')
  test_simple()
  subprocess.call('node ./src/index.js --input_file ./tests/1/events.json --window_size 10 --output_file ./tests/1/output.json')
  test_1()
  subprocess.call('node ./src/index.js --input_file ./tests/2/events.json --window_size 10 --output_file ./tests/2/output.json')
  test_2()
  subprocess.call('node ./src/index.js --input_file ./tests/3/events.json --window_size 10 --output_file ./tests/3/output.json')
  test_3()
  subprocess.call('node ./src/index.js --input_file ./tests/4/events.json --window_size 10 --output_file ./tests/4/output.json')
  test_4()
  subprocess.call('node ./src/index.js --input_file ./tests/5/events.json --window_size 10 --output_file ./tests/5/output.json')
  test_5()
  print("Everything passed")

            